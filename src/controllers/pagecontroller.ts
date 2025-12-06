import { Request, Response } from "express";
import Page from "../models/model.pages";

// ------------------------------------------------------
// GET ALL PAGES
// ------------------------------------------------------
export const getAllPages = async (req: Request, res: Response) => {
  try {
    const pages = await Page.findAll();
    res.json(pages);
  } catch (error) {
    console.error("GET ALL PAGES ERROR:", error);
    res.status(500).json({ error: "Failed to fetch pages" });
  }
};

// ------------------------------------------------------
// GET PAGE BY SLUG
// ------------------------------------------------------
export const getPageBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const page = await Page.findOne({
      where: { slug }
    });

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    res.json(page);
  } catch (error) {
    console.error("GET PAGE BY SLUG ERROR:", error);
    res.status(500).json({ error: "Failed to fetch page by slug" });
  }
};

// ------------------------------------------------------
// GET PAGE BY ID
// ------------------------------------------------------
export const getPageById = async (req: Request, res: Response) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    res.json(page);
  } catch (error) {
    console.error("GET PAGE ERROR:", error);
    res.status(500).json({ error: "Failed to fetch page" });
  }
};

// ------------------------------------------------------
// CREATE PAGE
// ------------------------------------------------------
export const createPage = async (req: Request, res: Response) => {
  try {
    const { title, slug, content } = req.body;

    const page = await Page.create({
      title,
      slug,
      content
    });

    res.json(page);
  } catch (error) {
    console.error("CREATE PAGE ERROR:", error);
    res.status(500).json({ error: "Failed to create page" });
  }
};

// ------------------------------------------------------
// UPDATE PAGE
// ------------------------------------------------------
export const updatePage = async (req: Request, res: Response) => {
  try {
    const page = await Page.findByPk(req.params.id);

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    const { title, slug, content } = req.body;

    await page.update({
      title,
      slug,
      content
    });

    res.json(page);
  } catch (error) {
    console.error("UPDATE PAGE ERROR:", error);
    res.status(500).json({ error: "Failed to update page" });
  }
};

// ------------------------------------------------------
// DELETE PAGE
// ------------------------------------------------------
export const deletePage = async (req: Request, res: Response) => {
  try {
    const page = await Page.findByPk(req.params.id);

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    await page.destroy();
    res.json({ message: "Page deleted" });
  } catch (error) {
    console.error("DELETE PAGE ERROR:", error);
    res.status(500).json({ error: "Failed to delete page" });
  }
};
