import { Request, Response } from 'express';
import { Product } from '../../models/scan/Product.model';
import { Valeur_nutrition } from '../../models/scan/Valeur_nutrition.model';

/**
 * creation de produ
 * @param req
 * @param res
 * @returns
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
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
    return res
      .status(201)
      .json({ message: 'Erreur: creation produit', product });
  } catch (error) {
    res.status(500).json({ message: 'erreur lors de creation de product' });
  }
};

/**
 * recuperation de prod
 * @param req
 * @param res
 */
export const getAllProd = async (req: Request, res: Response) => {
  try {
    const allProd: Product[] = await Product.findAll();
    res.status(200).json({ allProd });
  } catch (error) {
    res.status(404).json({ message: 'product not founded!', error });
  }
};

/**
 * recupation unitaire
 * @param req
 * @param res
 * @returns
 */
export const getOneProd = async (req: Request, res: Response) => {
  try {
    const prodId = req.body.id;
    const selectProd = await Product.findByPk(prodId);
    return res.status(200).json({ selectProd });
  } catch (error) {
    res.status(404).json({ message: 'product isnt found', error });
  }
};

/**
 * modification
 * @param req
 * @param res
 * @returns
 */
export const updateProd = async (req: Request, res: Response) => {
  try {
    const { series, name, fabricant, valeur_nutrition } = req.body;
    const prodId = req.params.prodId;
    const prodToUpdate = await Product.findByPk(prodId, {
      include: [Valeur_nutrition],
    });

    if (!prodToUpdate) {
      return res.status(404).json({ message: 'not founded' });
    }

    // Mettre à jour les attributs du produit
    prodToUpdate.series = series || prodToUpdate.series;
    prodToUpdate.name = name || prodToUpdate.name;
    prodToUpdate.fabricant = fabricant || prodToUpdate.fabricant;

    await prodToUpdate.save();

    return res.status(200).json({ message: 'Produit mis à jour avec succès' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Erreur lors de la mise à jour du produit' });
  }
};
