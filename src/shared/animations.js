import * as Animatable from 'react-native-animatable';

function loadAnimations() {

    Animatable.initializeRegistryWithDefinitions({
        generateNewCell:
        {
            0: {
                opacity: 0,
                scale: 0,
            },
            0.5: {
                opacity: 1,
                scale: 0.3,
            },
            1: {
                opacity: 1,
                scale: 1,
            },

        }

        
    });


}

export default loadAnimations;