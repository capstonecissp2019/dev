module.exports =
{
    hashcalculator: function(array) {
        let hash;
        for(i = 0; i <  array.length; i++)
        {
          hash+=array[i].toString();
        }
    }

    

}
    