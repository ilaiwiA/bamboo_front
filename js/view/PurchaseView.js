import View from "./View.js";

class PurchaseView extends View {
  _parentElement = document.querySelector(".aside-container");

  constructor() {
    super();
  }

  updatePurchasePanel(e) {
    e.preventDefault();
    if (e.target.id === "order-type") return this(e.target.value);

    const parent = e.target.closest(".aside-container");

    const html = parent.querySelector("#estimated-price");
    const val = e.target.value;

    if (e.target.id === "order-Shares") {
      const cost = Number(
        val * +parent.querySelector("#market-price").innerHTML.slice(1)
      ).toFixed(2);

      html.innerHTML =
        "$" +
        Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
        }).format(cost);
    } else if (e.target.id === "order-Dollars") {
      const cost =
        val / +parent.querySelector("#market-price").innerHTML.slice(1);

      html.innerHTML = cost - cost.toFixed(6) === 0 ? cost : cost.toFixed(6);
    }
  }

  addHandlerInput(handler) {
    this._parentElement.addEventListener(
      "input",
      this.updatePurchasePanel.bind(handler)
    );
  }

  addHandlerPurchaseCost(handler) {
    this._parentElement.querySelector(".");
  }

  _generateHTML() {
    return `
    <div class="purchase-container side-container">
          <div class="purchase-panel panel">
            <h2>Buy ${this._data.symbol}</h2>
            <hr />
            <form action="" class="purchase-form">
              <section>
                <p>Order Type</p>
                <p>Market Order</p>
              </section>

              <section>
              ${this._generatePurchaseLabel(
                this._generatePurchaseType(this._data.purchaseType)
              )}
              </section>

              <section>
                <label for="order-${this._generatePurchaseType(
                  this._data.purchaseType
                )}">${this._generatePurchaseType(
      this._data.purchaseType
    )}</label>
                <input type="number" min="0" class= "order-value" id="order-${this._generatePurchaseType(
                  this._data.purchaseType
                )}" placeholder = '0'/>
              </section>
              
              <section class="current-market">
                <p>Market Price</p>
                <p id="market-price">$${Number(this._data.lastPrice).toFixed(
                  2
                )}</p>
              </section>
              <hr />

              <section class="current-estimated">
                <p>${
                  this._data.purchaseType === "Dollars"
                    ? "Est. Quantity"
                    : "Estimated Cost"
                }</p>
                <p id="estimated-price">${
                  this._data.purchaseType === "Dollars" ? "" : "$"
                }0.00
                </p>
              </section>

              <input type="submit" id="btn-submit" value="Review" />
            </form>
            <hr />

            <p class="user-available">$${
              this._data.availableBal || "0.00"
            }<span> available</span></p>
          </div>
        </div>
    `;
  }

  _generateCost(quantityShares) {
    return Number(this._data.lastPrice) * quantityShares;
  }
  _generateQuantity(quantityMoney) {
    return quantityMoney / Number(this._data.lastPrice);
  }

  _generatePurchaseType(data) {
    if (data) return data;

    return "Shares";
  }

  _generatePurchaseLabel(data) {
    return `
    <label for="order-type">Buy in</label>
    <select name="order-type" id="order-type">
      <option value="Shares" ${
        data === "Shares" ? "selected" : ""
      }>Shares</option>
      <option value="Dollars" ${
        data === "Dollars" ? "selected" : ""
      }>Dollars</option>
    </select>
    `;
  }
}

export default new PurchaseView();
