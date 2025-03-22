const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  try {
      for (const record of event.Records || []) {
          const { eventName, userIdentity, eventTime } = record;
          console.log(`Processing Event: ${eventName} at ${eventTime} by ${userIdentity?.arn}`);
          // Add custom logic (e.g., store logs, trigger alerts, etc.)
      }

      return { statusCode: 200, body: JSON.stringify({ message: "Event processed successfully" }) };
  } catch (error) {
      console.error("Error processing event:", error);
      return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
  }
};

module.exports = { handler };
