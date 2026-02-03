import template from "./compareProduct.hbs";
import "./compareProduct.scss";

const transformData = (data) => {
  if (!data.specifications || !data.products) {
    return data;
  }

  // Transform specifications to include productValues array
  const transformedSpecifications = data.specifications.map((spec) => {
    const productValues = data.products.map((product) => {
      const productKey = product.id;
      return spec.values[productKey] || null;
    });
    return {
      ...spec,
      productValues,
      isBoolean: spec.type === "boolean",
    };
  });

  return {
    ...data,
    specifications: transformedSpecifications,
  };
};

export const fetchComparisonData = async (apiUrl, options = {}) => {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return transformData(data);
  } catch (error) {
    console.error("Error fetching comparison data:", error);
    throw error;
  }
};

export const CompareProduct = (args) => {
  if (!args.title) {
    args.title = "Compare Products";
  }

  // Transform the data to make it template-friendly
  const transformedData = transformData(args);

  return template(transformedData);
};

export const CompareProductFromAPI = async (apiUrl, fetchOptions = {}) => {
  const data = await fetchComparisonData(apiUrl, fetchOptions);
  return CompareProduct(data);
};
