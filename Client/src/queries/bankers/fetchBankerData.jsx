export const fetchBankerData = async () => {
    try {
      const response = await fetch('https://localhost:7234/api/Banker');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };