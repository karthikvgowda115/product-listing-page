module.exports = {
  GST_PERCENTAGE: process.env.GST_PERCENTAGE || 18,
  
  SORT_OPTIONS: {
    PRICE_LOW_TO_HIGH: 'price_asc',
    PRICE_HIGH_TO_LOW: 'price_desc',
    NAME_A_TO_Z: 'name_asc',
    NAME_Z_TO_A: 'name_desc'
  },
  
  CATEGORIES: {
    INNERWEAR: 'innerwear',
    MEN: 'men',
    WOMEN: 'women',
    KIDS: 'kids'
  }
};