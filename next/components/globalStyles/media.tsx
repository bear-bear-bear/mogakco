interface IMedia {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

const media: IMedia = {
  xs: `@media only screen and (max-width: 576px)`,
  sm: `@media only screen and (min-width: 576px)`,
  md: `@media only screen and (min-width: 768px)`,
  lg: `@media only screen and (min-width: 992px)`,
  xl: `@media only screen and (min-width: 1200px)`,
  xxl: `@media only screen and (min-width: 1600px)`,
};

export default media;
