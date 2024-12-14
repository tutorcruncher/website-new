export const RenderSchemas = ({ schemas }) => {
  if (schemas && Array.isArray(schemas)) {
    return (
      <>
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}
      </>
    );
  }
  return null;
};
