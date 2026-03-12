export const BubbleBgDecoration = () => {
    return (
        <>
            {/* Background decoration */}
            <div
                style={{
                    position: "absolute",
                    top: -30,
                    right: -30,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.07)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: -20,
                    right: 40,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                }}
            />
        </>
    );
};
