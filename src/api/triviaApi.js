
import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php';

export const fetchQuestions = async (category, difficulty) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        amount: 5,
        category,
        difficulty,
        type: 'multiple',
      },
    });
    
    if (response.data.response_code === 0) {
      return response.data.results;
    } else {
      throw new Error('Failed to fetch trivia questions');
    }
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    throw error;
  }
};

export const getCategoryList = async () => {
  try {
    const response = await axios.get('https://opentdb.com/api_category.php');
    return response.data.trivia_categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};