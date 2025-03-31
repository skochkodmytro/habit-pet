import axios from 'axios';

import { DailyPlanItem, HabitWithLog } from '../types';

const SYSTEM_INSTRUCTION =
  "You will help users create their daily plans. Each day, you will receive a list of habits with optional descriptions. Based on this, you need to generate a daily schedule, suggesting the best times for each habit or making other relevant adjustments. Give answer as a schedule list. Withou begining welcome setntence or any 'Okey'. And give answer like JSON format without ```json in the start. Just an array json. Something like {time: 7 AM - 10 AM, title: 'To do exiccirs'}. But add your descriptin and title how you see this. User can make mistake";

type RequestDto = HabitWithLog[];
type ResponseDto = DailyPlanItem[];

export const getAiAdvicesPerDay = (
  habits: RequestDto
): Promise<ResponseDto> => {
  const requestPrompt = habits.reduce((acc, current, index) => {
    let item = `. ${index + 1}) ${current.name}`;
    if (current.description) item += ` (description: ${current.description})`;
    return (acc += item);
  }, '');

  return axios
    .post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCFQ3Su53lGm05To8O6bLwhHNrvha1rhvY',
      {
        system_instruction: {
          parts: [
            {
              text: SYSTEM_INSTRUCTION,
            },
          ],
        },
        contents: [
          {
            parts: [{ text: requestPrompt }],
          },
        ],
      }
    )
    .then((res) => res.data)
    .then((res) => {
      const apiResponse = res.candidates[0].content.parts[0].text;
      const cleanedResponse = apiResponse.replace(/```json\n|\n```/g, '');
      return JSON.parse(cleanedResponse);
    });
};
