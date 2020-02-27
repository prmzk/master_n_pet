    function imgSelector(type){
        if(type == 'Cat'){
            return '/catlogo.jpeg'
        } 
        else if(type == 'Dog'){
            return '/dog.jpeg'
        }
        else if(type == 'Bunny'){
            return '/bunny.jpg'
        }
        else if(type == 'Hamster'){
            return '/hamster.jpeg'
        }
        else if(type == 'Fish'){
            return '/fish.jpeg'
        }else{
            return '/other.png'
        }
    }

module.exports = imgSelector