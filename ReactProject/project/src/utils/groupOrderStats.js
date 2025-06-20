// src/utils/groupOrderStats.js
export function groupOrderStats(filtered) {
  // 回傳結構：{ [shopname]: { tel, items: { [dish]: { quantity, priceSum, count, totalPrice } } } }
  const shopStats = {};
  filtered.forEach((item) => {
    if (!shopStats[item.shopname]) {
      shopStats[item.shopname] = { tel: item.tel, items: {} };
    }
    if (!shopStats[item.shopname].items[item.name]) {
      shopStats[item.shopname].items[item.name] = {
        quantity: 0,
        priceSum: 0,
        count: 0,
        totalPrice: 0,
      };
    }
    shopStats[item.shopname].items[item.name].quantity += Number(item.quantity);
    shopStats[item.shopname].items[item.name].priceSum += Number(item.price);
    shopStats[item.shopname].items[item.name].count += 1;
    shopStats[item.shopname].items[item.name].totalPrice += Number(
      item.totalprice
    );
  });
  return shopStats;
}
