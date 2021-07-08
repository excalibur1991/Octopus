import {
    View, 
    Image,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';



const SwipeImageCard = (props) => {
    const {
        images = [], 
        image_id=''
    } = props || {};

    const findImage = () => {
        var card = null;
        images.map((data)=>{
          if(data.image_id == image_id){
            card = data;
          }
        })
        return card ? {uri:card.image} : require('../assets/top_image.png')
      }
    

    return (
    <View style={styles.card}>
        <Image 
            style={styles.thumbnail}
            source={ 
                findImage(props)
            } />
    </View>
    );
};


const styles = StyleSheet.create({
    card: {
      alignItems: 'center',
      overflow: 'hidden',
      borderColor: 'grey',
      backgroundColor: 'white',
      borderRadius: 43,
      width: 302,
      height: 307,
      borderWidth: 0,  
      elevation: 1
    },
    thumbnail: {
        width: 302,
        height: 307,
    }
  })

SwipeImageCard.propTypes = {
    images = PropTypes.array,
    image_id = PropTypes.string,
};

export default SwipeImageCard;