import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { CreateNutritionInput, UpdateNutritionInput } from '../types';

const prisma = new PrismaClient();

// Luo uusi ravintomerkintä
export const createNutritionEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const data: CreateNutritionInput = req.body;

    if (!data.mealType || !data.foodName) {
      return res.status(400).json({ error: 'Meal type and food name are required' });
    }

    const entry = await prisma.nutritionEntry.create({
      data: {
        userId,
        ...data,
      },
    });

    res.status(201).json({
      message: 'Nutrition entry created successfully',
      entry,
    });
  } catch (error) {
    console.error('Create nutrition entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Hae kaikki käyttäjän ravintomerkinnät
export const getNutritionEntries = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { startDate, endDate } = req.query;

    let whereClause: any = { userId };

    // Jos aikavälillä haetaan
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = new Date(startDate as string);
      if (endDate) whereClause.date.lte = new Date(endDate as string);
    }

    const entries = await prisma.nutritionEntry.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
    });

    res.json(entries);
  } catch (error) {
    console.error('Get nutrition entries error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Hae yksittäinen ravintomerkintä
export const getNutritionEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    const entry = await prisma.nutritionEntry.findFirst({
      where: { id, userId },
    });

    if (!entry) {
      return res.status(404).json({ error: 'Nutrition entry not found' });
    }

    res.json(entry);
  } catch (error) {
    console.error('Get nutrition entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Päivitä ravintomerkintä
export const updateNutritionEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const data: UpdateNutritionInput = req.body;

    // Tarkista että merkintä kuuluu käyttäjälle
    const existingEntry = await prisma.nutritionEntry.findFirst({
      where: { id, userId },
    });

    if (!existingEntry) {
      return res.status(404).json({ error: 'Nutrition entry not found' });
    }

    const entry = await prisma.nutritionEntry.update({
      where: { id },
      data,
    });

    res.json({
      message: 'Nutrition entry updated successfully',
      entry,
    });
  } catch (error) {
    console.error('Update nutrition entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Poista ravintomerkintä
export const deleteNutritionEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    // Tarkista että merkintä kuuluu käyttäjälle
    const existingEntry = await prisma.nutritionEntry.findFirst({
      where: { id, userId },
    });

    if (!existingEntry) {
      return res.status(404).json({ error: 'Nutrition entry not found' });
    }

    await prisma.nutritionEntry.delete({
      where: { id },
    });

    res.json({ message: 'Nutrition entry deleted successfully' });
  } catch (error) {
    console.error('Delete nutrition entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};