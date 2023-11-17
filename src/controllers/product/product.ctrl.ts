import { Request, Response } from 'express';
import { Product } from '../../models/scan/Product.model';
import { Valeur_nutrition } from '../../models/scan/Valeur_nutrition.model';

export const createProduct = async (res: Response, req: Request) => {
  const { series, name, fabricant, valeur_nutrition } = req.body;
  const product = await Product.create({
    series,
    name,
    fabricant,
  });
  // sauvegarder le produit
  await product.save();

  // ajout des valeur nutritionnel
  for (const nutritionData of valeur_nutrition) {
    const valeur = await Valeur_nutrition.create(nutritionData);
    await product.addNutritions(valeur);
  }
  return res.status(201).json({ message: 'Erreur: creation produit', product });
};

export const getAllProd = async (res: Response, req: Request) => {
  const allProd: Product[] = await Product.findAll();
  return res
    .status(200)
    .json({ message: 'get all products Successfull', allProd });
};
