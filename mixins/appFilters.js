import { isUndefined, isNull, maxBy, minBy } from "lodash";

export const propertiesFilters = {
  data() {
    return {
      type: "0",
      range: [0, 0], 
    };
  },
  computed: {
    priceLimit() {
      if (this.properties) {
        let max = maxBy(this.properties, function(o) {
          return o.price;
        });

        let min = minBy(this.properties, function(o) {
          return o.price;
        });
        return [min.price, max.price];
      }
      return;
    },

    filteredProperties() {
      let mthis = this;
      return this.properties
        .filter(function(property) {
          if (
            ((isNull(mthis.range[0]) || mthis.range[0] === 0) &&
              (isNull(mthis.range[1]) || mthis.range[1] === 0)) ||
            mthis.range[0] == mthis.range[1]
          ) {
            return true;
          } else {
            return (
              property.price >= mthis.range[0] &&
              property.price <= mthis.range[1]
            );
          }
        })
        .filter(function(property) {
          if (
            isUndefined(mthis.type) ||
            isNull(mthis.type) ||
            mthis.type === "" ||
            mthis.type === "0"
          ) {
            return true;
          } else {
            return property.type === mthis.type;
          }
        });
    }
  }
};
