export type ResponsiveProp<T> = {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

export type Responsive<T> = T | ResponsiveProp<T>;
