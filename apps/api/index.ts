import express from "express"
import { authMiddleware } from "./middleware";
import { prismaClient } from "db/client";

const app = express();

app.use(express.json());

// add a webiste for monitoring
app.post("/api/v1/website", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const { url } = req.body;

    const data = await prismaClient.user.create({
        data: {
            userId,
            url
        }
    })

    res.json({
        id: data.id
    })
})

// get status of a website
app.get("/api/v1/website/status", authMiddleware, async (req, res) => {
    const websiteId = req.query.websiteId! as unknown as string;
    const userId = req.userId;

    const data = await prismaClient.website.findFirst({
        where: {
            id: websiteId,
            userId,
            disabled: false,
        },
        include: {
            ticks: true
        }
    })

    res.json(data);
})

// get list of websites of a user
app.get("/api/v1/websites", authMiddleware, async (req, res) => {
    const userId = req.userId!;

    const websites = await prismaClient.website.findMany({
        where: {
            userId,
            disabled: false
        },
        include: {
            ticks: true
        }
    })

    res.json({
        websites
    })
})

// delete a website from users list for monitoring
app.delete("/api/v1/website/", authMiddleware, async (req, res) => {
    const websiteId = req.params.websiteId!;
    const userId = req.userId;

    await prismaClient.website.update({
        where: {
            id: websiteId,
            userId
        }, 
        data: {
            disabled: true
        }
    })
})

app.listen(8080);
