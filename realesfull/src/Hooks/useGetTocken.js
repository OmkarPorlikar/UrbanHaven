const getIdToken = async (user) => {
    try {
      const token = await user.getIdToken();
    //   console.log("Token from signup:", token);
      return token;
    } catch (error) {
      console.log("Cannot ge token")
      console.error('Error retrieving token:', error);
    }
  };
  
  export default getIdToken;
  