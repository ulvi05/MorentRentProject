import { Helmet } from "react-helmet";

const DynamicHelmet = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`Morent Car | ${pageTitle}`}</title>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};

export default DynamicHelmet;
