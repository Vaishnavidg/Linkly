import {Request, Response} from 'express';    
import { nanoid } from 'nanoid';
import UrlModel from '../models/url.js';
import UserModel from '../models/users.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export const handleGenerateShortUrlWithoutSignIn = async(req: Request, res: Response) : Promise<void> => {
    try{
        console.log("req",req );
        const url = req.body.url;
        console.log("Request body:", req.body);
        console.log("Received URL:", url);

        if(!url) {
            res.status(400).json({
                error: 'Original URL is required'
            });
            return;
        }
        const shortId = nanoid(8);

        console.log('Generated shortId:', shortId);
        const newUrl =  await UrlModel.create({
            shortId:shortId,
            originalUrl: url,
            visitHistory:[],
            user: null
        });

        res.status(201).json({
            message: ' Short URL generated successfully',
            shortId: shortId
        });
        
        }
    catch(error){
        console.error('Error generating short URL:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }  
}

export const handleGenerateShortUrl = async(req: AuthRequest, res: Response) : Promise<void> => {
    try{
        const {url} = req.body;
        console.log('Received URL:', url);
        if(!url) {
            res.status(400).json({
                error: 'Original URL is required'
            });
            return;
        }
        const shortId = nanoid(8);

        // Identify logged-in user from JWT
        const userId = req.userId ?? null;
        console.log('Generated shortId:', shortId);
        const newUrl =  await UrlModel.create({
            shortId:shortId,
            originalUrl: url,
            visitHistory:[],
            user: userId
        });
            // If logged in, add URL reference to user's urls array
        if (userId) {
            await UserModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    urls: newUrl._id,
                },
            }
            );
        }

        res.status(201).json({
            message: ' Short URL generated successfully',
            shortId: shortId
        });
        
        }
    catch(error){
        console.error('Error generating short URL:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }  
}

export const handleRedirectToOriginalUrl = async(req: Request, res: Response) : Promise<void> => {
    try{
        const {shortId} = req.params;
        const urlEntry = await UrlModel.findOneAndUpdate(
            {shortId: shortId},
            {$push : {visitHistory: {timestamp: new Date()}}},
            {new: true}
        );
        if(!urlEntry){
            res.status(404).json({
                error: 'Short URL not found'
            });
            return;
        }
        res.redirect(urlEntry.originalUrl);

    }
    catch(error){
        console.error('Error redirecting to original URL:', error);
        res.status(500).json({
            error: 'Internal server error'
        }); 
    }
        
    }

export const hangleGetUrlAnalytics = async(req:Request, res: Response) : Promise<void> => {
        try{
            const {shortId} = req.params;
            const urlEntry = await UrlModel.findOne({shortId: shortId});
            if(!urlEntry){
                res.status(404).json({
                    error: 'Short URL not found'
                });
                return;
            }
            res.status(200).json({
                shortId: urlEntry.shortId,
                originalUrl: urlEntry.originalUrl,
                totalClicks: urlEntry.visitHistory.length,
                visitHistory: urlEntry.visitHistory
            });
        }
        catch(error){
            console.error('Error fetching URL analytics:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }


export const handleUsersUrls = async(req: AuthRequest, res: Response): Promise<void> =>{
    try{
        const userId = req.userId;

        if(!userId){
            res.status(400).json({
                message:"Invalid inputs",
            })
        }
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(
          Math.max(Number(req.query.limit) || 20, 1),
          100
        );
    

        const skip = (page-1) * limit;

       const [user, totalUrls]= await Promise.all([
        UserModel.findById({_id: userId}).populate({
            "path":"urls",
            options:{
                sort: {createdAt:-1},
                skip,
                limit, 
            }
        }),

        UrlModel.countDocuments({user:userId})
    
    ]);

    if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }

    res.status(200).json({
        message: "Urls fetched successfully",
        data: user.urls,
        pagination:{
            currentPage: page,
            limit,
            totalUrls,
            totalPage: Math.ceil(totalUrls/limit),
            nextPage: page < Math.ceil(totalUrls/limit),
            previousPage: page > 1,

        }

    })

    }catch(error){
        console.error("Error fetching user URLs:", error);
        res.status(500).json({
            message:"Internal server error",
        })
    }
}
