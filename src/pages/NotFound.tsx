import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-lg mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="text-[12rem] md:text-[16rem] font-serif font-bold text-primary/5 leading-none select-none">
            404
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center flex-col"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              Página não encontrada
            </h1>
            <p className="text-xl text-muted-foreground">
              Ops! Parece que você se perdeu no código.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Voltar para Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary/20 hover:bg-muted">
            <Link to="/#contact">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Entrar em Contato
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
