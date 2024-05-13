import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbURI: any = process.env.MONGODB_URI;
    await mongoose.connect(dbURI);
    console.log('Conexão com MongoDB estabelecida');
  } catch (error) {
    console.error('Erro ao conectar com MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;