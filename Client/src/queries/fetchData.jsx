export const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:7234/api/CreditRecord');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };