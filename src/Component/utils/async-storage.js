export const storeData = async (key, value) => {
    try {
      await localStorage.setItem(`${key}`, `${value}`);
    } catch (error) {
      console.log(error);
    }
  };
  
export const getData = async (key) => localStorage.getItem(`${key}`);