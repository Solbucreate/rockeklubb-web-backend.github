import { Request, Response } from "express";
import Settings from "../models/model.settings";

export const getSettings = async (req: Request, res: Response) => {
  let settings = await Settings.findByPk(1);

  if (!settings) {
    settings = await Settings.create({
      id: 1,
      logoLeft: null,
      logoCenter: null,
      bannerImage: null,
      heroTitle: "Velkommen til Larvik Rockeklubb",
      heroSubtitle: "Opplev rockmusikk og klubbstemning i Larvik!",
      newsletterText: "Meld deg på vårt nyhetsbrev",
      footerText: "© 2025 Larvik Rockeklubb. Alle rettigheter forbeholdt."
    });
  }

  res.json(settings);
};

export const updateSettings = async (req: Request, res: Response) => {
  let settings = await Settings.findByPk(1);

  if (!settings) {
    settings = await Settings.create({ id: 1 });
  }

  await settings.update(req.body);
  res.json(settings);
};
