import { useEffect, useReducer } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import dataReducer, {
  SET_POPUP,
  SET_SPACE_VISUAL_MODE,
  SET_SPACE_DATA,
} from '../reducer/data_reducer';

const useSpaceData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
      popUp: false,
      visualMode: "SPACE_SHOW",
      spaceData: {},
      mapLoaded: false
  });
  //toggles the small request confirmation popup between visible and not visible
  const togglePopUp = bool => {
    dispatch({
      type:SET_POPUP,
      popUp: bool
    })
   }
  //changes the visual mode of Space component -- currently just between viewing space and request form
  const setVisualMode = mode => {
    dispatch({
      type: SET_SPACE_VISUAL_MODE,
      visualMode: mode
    })
  }
  
  const history = useHistory();
  //used on buttons to link a new path
  const reroute = path =>{ 
    history.push(path);
  }
  //grabs space_id from /space/:space_id
  const { space_id } = useParams();

  //hack to conditionally render Capoeria small photos, and photo placeholders for other properties
  let smallImgUrls;
  if (space_id == 9) {
    smallImgUrls = [
      "https://res.cloudinary.com/davik/image/upload/v1621288184/rehearsal_room/hzpcjjl0uujpcjuiaamy.png",
      "https://res.cloudinary.com/davik/image/upload/v1621288171/rehearsal_room/uohyg0dfvnfirqit5rsl.png",
      "https://res.cloudinary.com/davik/image/upload/v1621288157/rehearsal_room/dpghdp2np1hy5htzhc79.png",
      "https://res.cloudinary.com/davik/image/upload/v1621288150/rehearsal_room/ppfrd9czz2outpwgjzor.png",
      "https://res.cloudinary.com/davik/image/upload/v1621288142/rehearsal_room/c6gqx6kabvpeq4wkmejj.png"
    ]
  } else {
    smallImgUrls = [
      "https://res.cloudinary.com/davik/image/upload/v1621367637/rehearsal_room/inaeffzjseltvxrhp342.png",
      "https://res.cloudinary.com/davik/image/upload/v1621367637/rehearsal_room/inaeffzjseltvxrhp342.png",
      "https://res.cloudinary.com/davik/image/upload/v1621367637/rehearsal_room/inaeffzjseltvxrhp342.png",
      "https://res.cloudinary.com/davik/image/upload/v1621367637/rehearsal_room/inaeffzjseltvxrhp342.png",
      "https://res.cloudinary.com/davik/image/upload/v1621367637/rehearsal_room/inaeffzjseltvxrhp342.png"
    ]
  }

  useEffect(() => {
    //open page at top of window
    window.scrollTo(0, 0);
    
    //gets necessary data for this space & sets spaceData in state
    axios({
      method: 'GET',
      url: `/api/space/${space_id}`,
    })
    .then(({ data }) => {
      dispatch({
        type: SET_SPACE_DATA,
        spaceData: data[0]
      })
    })
    .catch((err) => console.error(err));
  }, [space_id]);

  return {
      state,
      togglePopUp,
      setVisualMode, 
      reroute, 
      smallImgUrls
  };
};

export default useSpaceData;