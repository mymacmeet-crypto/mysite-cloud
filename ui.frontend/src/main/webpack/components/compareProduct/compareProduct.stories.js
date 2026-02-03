import { CompareProduct } from "./compareProduct";
import compareData from "./compare-data.json";

export default {
  title: "Components/CompareProduct",
};

// Two Products Comparison
export const TwoProducts = {
  render: () =>
    CompareProduct({
      title: "Compare Products",
      products: compareData.products,
      specifications: compareData.specifications,
    }),
};

// Three Products Comparison
export const ThreeProducts = {
  render: () =>
    CompareProduct({
      title: "Compare Products",
      products: [
        ...compareData.products,
        {
          id: "product_3",
          name: "Elite Sound Master",
          image_url:
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
          pricing: {
            current_price: 349.99,
            original_price: 399.99,
            currency: "USD",
            discount_percentage: 12.5,
          },
          rating: {
            average: 4.9,
            scale: 5,
          },
        },
      ],
      specifications: [
        {
          key: "driver_size",
          label: "Driver Size",
          unit: "mm",
          values: {
            product_1: { value: 40, display: "40mm" },
            product_2: { value: 50, display: "50mm" },
            product_3: { value: 45, display: "45mm" },
          },
        },
        {
          key: "frequency_response",
          label: "Frequency Response",
          unit: "Hz-kHz",
          values: {
            product_1: {
              value: { min: 20, max: 20000 },
              display: "20Hz-20kHz",
            },
            product_2: {
              value: { min: 10, max: 40000 },
              display: "10Hz-40kHz",
            },
            product_3: {
              value: { min: 15, max: 30000 },
              display: "15Hz-30kHz",
            },
          },
        },
        {
          key: "active_noise_cancellation",
          label: "Active Noise Cancellation",
          type: "boolean",
          values: {
            product_1: { value: true, display: "✓" },
            product_2: { value: true, display: "✓" },
            product_3: { value: true, display: "✓" },
          },
        },
        {
          key: "battery_life",
          label: "Battery Life",
          unit: "hours",
          values: {
            product_1: { value: 30, display: "30 hours" },
            product_2: { value: 24, display: "24 hours" },
            product_3: { value: 35, display: "35 hours" },
          },
        },
        {
          key: "wireless",
          label: "Wireless",
          type: "boolean",
          values: {
            product_1: { value: true, display: "✓" },
            product_2: { value: true, display: "✓" },
            product_3: { value: true, display: "✓" },
          },
        },
        {
          key: "bluetooth_version",
          label: "Bluetooth Version",
          type: "string",
          values: {
            product_1: { value: "5.3", display: "5.3" },
            product_2: { value: "5.2", display: "5.2" },
            product_3: { value: "5.3", display: "5.3" },
          },
        },
        {
          key: "foldable_design",
          label: "Foldable Design",
          type: "boolean",
          values: {
            product_1: { value: true, display: "✓" },
            product_2: { value: false, display: "✗" },
            product_3: { value: true, display: "✓" },
          },
        },
        {
          key: "weight",
          label: "Weight",
          unit: "g",
          values: {
            product_1: { value: 250, display: "250g" },
            product_2: { value: 280, display: "280g" },
            product_3: { value: 260, display: "260g" },
          },
        },
        {
          key: "included_case",
          label: "Included Case",
          type: "boolean",
          values: {
            product_1: { value: true, display: "✓" },
            product_2: { value: true, display: "✓" },
            product_3: { value: true, display: "✓" },
          },
        },
        {
          key: "warranty",
          label: "Warranty",
          type: "string",
          values: {
            product_1: { value: "2 years", display: "2 years" },
            product_2: { value: "2 years", display: "2 years" },
            product_3: { value: "3 years", display: "3 years" },
          },
        },
      ],
    }),
};

// Six Products - Demonstrating Unlimited Products Support
export const SixProducts = {
  render: () =>
    CompareProduct({
      title: "Compare Products - Unlimited Support",
      products: [
        {
          id: "product_1",
          name: "Wireless Pro",
          image_url:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
          pricing: {
            current_price: 299.99,
            original_price: null,
            currency: "USD",
          },
          rating: { average: 4.8, scale: 5 },
        },
        {
          id: "product_2",
          name: "Studio Monitor",
          image_url:
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
          pricing: {
            current_price: 249.99,
            original_price: 279.99,
            currency: "USD",
          },
          rating: { average: 4.5, scale: 5 },
        },
        {
          id: "product_3",
          name: "Elite Sound",
          image_url:
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
          pricing: {
            current_price: 349.99,
            original_price: 399.99,
            currency: "USD",
          },
          rating: { average: 4.9, scale: 5 },
        },
        {
          id: "product_4",
          name: "Budget Audio",
          image_url:
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop",
          pricing: {
            current_price: 179.99,
            original_price: null,
            currency: "USD",
          },
          rating: { average: 4.3, scale: 5 },
        },
        {
          id: "product_5",
          name: "Premium Max",
          image_url:
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=400&fit=crop",
          pricing: {
            current_price: 449.99,
            original_price: 499.99,
            currency: "USD",
          },
          rating: { average: 5.0, scale: 5 },
        },
        {
          id: "product_6",
          name: "Basic Plus",
          image_url:
            "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=400&fit=crop",
          pricing: {
            current_price: 149.99,
            original_price: null,
            currency: "USD",
          },
          rating: { average: 4.2, scale: 5 },
        },
      ],
      specifications: [
        {
          key: "driver_size",
          label: "Driver Size",
          values: {
            product_1: { value: 40, display: "40mm" },
            product_2: { value: 50, display: "50mm" },
            product_3: { value: 45, display: "45mm" },
            product_4: { value: 40, display: "40mm" },
            product_5: { value: 55, display: "55mm" },
            product_6: { value: 35, display: "35mm" },
          },
        },
        {
          key: "active_noise_cancellation",
          label: "Active Noise Cancellation",
          type: "boolean",
          values: {
            product_1: { value: true, display: "✓" },
            product_2: { value: true, display: "✓" },
            product_3: { value: true, display: "✓" },
            product_4: { value: false, display: "✗" },
            product_5: { value: true, display: "✓" },
            product_6: { value: false, display: "✗" },
          },
        },
        {
          key: "wireless",
          label: "Wireless",
          type: "boolean",
          values: {
            product_1: { value: true, display: "✓" },
            product_2: { value: true, display: "✓" },
            product_3: { value: true, display: "✓" },
            product_4: { value: true, display: "✓" },
            product_5: { value: true, display: "✓" },
            product_6: { value: false, display: "✗" },
          },
        },
        {
          key: "foldable_design",
          label: "Foldable Design",
          type: "boolean",
          values: {
            product_1: { value: true, display: "✓" },
            product_2: { value: false, display: "✗" },
            product_3: { value: true, display: "✓" },
            product_4: { value: false, display: "✗" },
            product_5: { value: true, display: "✓" },
            product_6: { value: false, display: "✗" },
          },
        },
      ],
    }),
};

// Example: Using with API (async story)
export const FromAPI = {
  render: async () => {
    // Example of how to use the API function
    // Replace with your actual API endpoint

    /* 
    // Real API usage:
    try {
      return await CompareProductFromAPI('https://api.example.com/compare-products', {
        headers: {
          'Authorization': 'Bearer YOUR_TOKEN'
        }
      });
    } catch (error) {
      return `<div>Error loading comparison: ${error.message}</div>`;
    }
    */

    // For demo purposes, simulate API call with static data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          CompareProduct({
            title: "API Loaded Products",
            products: compareData.products,
            specifications: compareData.specifications,
          }),
        );
      }, 500);
    });
  },
};
