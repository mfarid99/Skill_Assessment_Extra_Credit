function generateRandonName (length = 8){
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let name = '';
    for(let i = 0; i < length; i++){
        name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return name;
}

module.exports = { generateRandonName }