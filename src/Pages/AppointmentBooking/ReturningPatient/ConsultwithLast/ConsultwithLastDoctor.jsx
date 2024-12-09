import axios from 'axios'
import React , {useEffect , useState} from 'react'

const ConsultwithLastDoctor = () => {
  const [userBooking, setUserBooking] = useState([]);

  // Mock tokens and IDs (Replace these with your actual logic)
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const userBookings = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/history`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setUserBooking(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userBookings();
  }, []);
  return (
    <div>

    </div>
  )
}

export default ConsultwithLastDoctor