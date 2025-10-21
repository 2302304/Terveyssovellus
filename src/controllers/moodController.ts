import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { CreateMoodInput, UpdateMoodInput } from '../types';

const prisma = new PrismaClient();

export const createMoodEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const data: CreateMoodInput = req.body;

    if (data.mood === undefined) {
      return res.status(400).json({ error: 'Mood is required' });
    }

    if (data.mood < 1 || data.mood > 10) {
      return res.status(400).json({ error: 'Mood must be between 1 and 10' });
    }

    const entry = await prisma.moodEntry.create({
      data: {
        userId,
        ...data,
      },
    });

    res.status(201).json({
      message: 'Mood entry created successfully',
      entry,
    });
  } catch (error) {
    console.error('Create mood entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMoodEntries = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { startDate, endDate } = req.query;

    let whereClause: any = { userId };

    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = new Date(startDate as string);
      if (endDate) whereClause.date.lte = new Date(endDate as string);
    }

    const entries = await prisma.moodEntry.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
    });

    res.json(entries);
  } catch (error) {
    console.error('Get mood entries error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMoodEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    const entry = await prisma.moodEntry.findFirst({
      where: { id, userId },
    });

    if (!entry) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }

    res.json(entry);
  } catch (error) {
    console.error('Get mood entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateMoodEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const data: UpdateMoodInput = req.body;

    if (data.mood !== undefined && (data.mood < 1 || data.mood > 10)) {
      return res.status(400).json({ error: 'Mood must be between 1 and 10' });
    }

    const existingEntry = await prisma.moodEntry.findFirst({
      where: { id, userId },
    });

    if (!existingEntry) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }

    const entry = await prisma.moodEntry.update({
      where: { id },
      data,
    });

    res.json({
      message: 'Mood entry updated successfully',
      entry,
    });
  } catch (error) {
    console.error('Update mood entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteMoodEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    const existingEntry = await prisma.moodEntry.findFirst({
      where: { id, userId },
    });

    if (!existingEntry) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }

    await prisma.moodEntry.delete({
      where: { id },
    });

    res.json({ message: 'Mood entry deleted successfully' });
  } catch (error) {
    console.error('Delete mood entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};