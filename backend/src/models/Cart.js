class CartItem {
  constructor(id, productId, name, price, quantity, imageUrl) {
    this.id = id;
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.imageUrl = imageUrl;
  }

  static fromDBRow(row) {
    return new CartItem(
      row.id,
      row.product_id,
      row.name,
      parseFloat(row.price),
      row.quantity,
      row.image_url
    );
  }

  toJSON() {
    return {
      id: this.id,
      productId: this.productId,
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      imageUrl: this.imageUrl,
      subtotal: this.price * this.quantity
    };
  }
}

module.exports = CartItem;