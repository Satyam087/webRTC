import { Request, Response, NextFunction } from 'express';
import { interviewService } from '../services/interview.service';
import { createInterviewSchema, tokenQuerySchema } from '../validators/interview.validator';

export class InterviewController {
  async createInterview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validated = createInterviewSchema.parse(req.body);
      const result = await interviewService.createInterview(validated);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getToken(req: Request<{ roomId: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { roomId } = req.params;
      const { identity, name } = tokenQuerySchema.parse(req.query);

      const result = await interviewService.generateJoinToken(roomId, identity, name);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getInterview(req: Request<{ roomId: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { roomId } = req.params;
      const interview = await interviewService.getInterviewByRoomId(roomId);

      if (!interview) {
        res.status(404).json({ error: 'Interview not found' });
        return;
      }

      res.json(interview);
    } catch (error) {
      next(error);
    }
  }

  async getAllInterviews(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const interviews = await interviewService.getAllInterviews();
      res.json(interviews);
    } catch (error) {
      next(error);
    }
  }
}

export const interviewController = new InterviewController();
