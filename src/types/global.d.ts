declare module "*.css";
declare module "*.js";
declare module "*.min.js";
declare module "*.html?raw" {
  const content: string;
  export default content;
}

declare const ApexCharts: any;
declare const jsVectorMap: any;
