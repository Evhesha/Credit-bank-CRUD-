export const deleteBankerData = async (id) => {
    try {
      const response = await fetch(`https://localhost:7234/api/Banker/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return 'Deleted successfully';
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };