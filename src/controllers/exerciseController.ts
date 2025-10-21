import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { CreateExerciseInput, UpdateExerciseInput } from '../types';

const prisma = new PrismaClient();

export const createExerciseEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const data: CreateExerciseInput = req.body;

    if (!data.exerciseType || !data.duration) {
      return res.status(400).json({ error: 'Exercise type and duration are required' });
    }

    const entry = await prisma.exerciseEntry.create({
      data: {
        userId,
        ...data,
      },
    });

    res.status(201).json({
      message: 'Exercise entry created successfully',
      entry,
    });
  } catch (error) {
    console.error('Create exercise entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getExerciseEntries = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { startDate, endDate } = req.query;

    let whereClause: any = { userId };

    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = new Date(startDate as string);
      if (endDate) whereClause.date.lte = new Date(endDate as string);
    }

    const entries = await prisma.exerciseEntry.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
    });

    res.json(entries);
  } catch (error) {
    console.error('Get exercise entries error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getExerciseEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    const entry = await prisma.exerciseEntry.findFirst({
      where: { id, userId },
    });

    if (!entry) {
      return res.status(404).json({ error: 'Exercise entry not found' });
    }

    res.json(entry);
  } catch (error) {
    console.error('Get exercise entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateExerciseEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const data: UpdateExerciseInput = req.body;

    const existingEntry = await prisma.exerciseEntry.findFirst({
      where: { id, userId },
    });

    if (!existingEntry) {
      return res.status(404).json({ error: 'Exercise entry not found' });
    }

    const entry = await prisma.exerciseEntry.update({
      where: { id },
      data,
    });

    res.json({
      message: 'Exercise entry updated successfully',
      entry,
    });
  } catch (error) {
    console.error('Update exercise entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteExerciseEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    const existingEntry = await prisma.exerciseEntry.findFirst({
      where: { id, userId },
    });

    if (!existingEntry) {
      return res.status(404).json({ error: 'Exercise entry not found' });
    }

    await prisma.exerciseEntry.delete({
      where: { id },
    });

    res.json({ message: 'Exercise entry deleted successfully' });
  } catch (error) {
    console.error('Delete exercise entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};