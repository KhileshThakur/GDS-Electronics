import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: "10px",
                        background: "#fff",
                        color: "#1E293B",
                    },
                }}
            />

            <AppRoutes />
        </>
    );
}

export default App;