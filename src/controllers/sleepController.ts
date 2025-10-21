import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { CreateSleepInput, UpdateSleepInput } from '../types';

const prisma = new PrismaClient();

export const createSleepEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const data: CreateSleepInput = req.body;

    if (!data.bedTime || !data.wakeTime || !data.duration || !data.quality) {
      return res.status(400).json({ 
        error: 'Bed time, wake time, duration, and quality are required' 
      });
    }

    const entry = await prisma.sleepEntry.create({
      data: {
        userId,
        bedTime: new Date(data.bedTime),
        wakeTime: new Date(data.wakeTime),
        duration: data.duration,
        quality: data.quality,
        interruptions: data.interruptions,
        notes: data.notes,
        date: data.date ? new Date(data.date) : new Date(),
      },
    });

    res.status(201).json({
      message: 'Sleep entry created successfully',
      entry,
    });
  } catch (error) {
    console.error('Create sleep entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSleepEntries = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { startDate, endDate } = req.query;

    let whereClause: any = { userId };

    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = new Date(startDate as string);
      if (endDate) whereClause.date.lte = new Date(endDate as string);
    }

    const entries = await prisma.sleepEntry.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
    });

    res.json(entries);
  } catch (error) {
    console.error('Get sleep entries error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSleepEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    const entry = await prisma.sleepEntry.findFirst({
      where: { id, userId },
    });

    if (!entry) {
      return res.status(404).json({ error: 'Sleep entry not found' });
    }

    res.json(entry);
  } catch (error) {
    console.error('Get sleep entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSleepEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const data: UpdateSleepInput = req.body;

    const existingEntry = await prisma.sleepEntry.findFirst({
      where: { id, userId },
    });

    if (!existingEntry) {
      return res.status(404).json({ error: 'Sleep entry not found' });
    }

    const updateData: any = { ...data };
    if (data.bedTime) updateData.bedTime = new Date(data.bedTime);
    if (data.wakeTime) updateData.wakeTime = new Date(data.wakeTime);

    const entry = await prisma.sleepEntry.update({
      where: { id },
      data: updateData,
    });

    res.json({
      message: 'Sleep entry updated successfully',
      entry,
    });
  } catch (error) {
    console.error('Update sleep entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteSleepEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    const existingEntry = await prisma.sleepEntry.findFirst({
      where: { id, userId },
    });

    if (!existingEntry) {
      return res.status(404).json({ error: 'Sleep entry not found' });
    }

    await prisma.sleepEntry.delete({
      where: { id },
    });

    res.json({ message: 'Sleep entry deleted successfully' });
  } catch (error) {
    console.error('Delete sleep entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};