import amqp from "amqplib";

const RABBITMQ_URL = "amqp://root:root@localhost";
const QUEUE_NAME = "myQueue";

async function consumeMessages() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log("Waiting for messages...");

    channel.consume(QUEUE_NAME, (message) => {
      if (message) {
        console.log(`Received: ${message.content.toString()}`);
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error("Error in consuming message:", error);
  }
}

consumeMessages();
