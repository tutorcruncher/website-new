export const RenderSchema = ({ schema }) => {
  if (schema)
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    );
};
