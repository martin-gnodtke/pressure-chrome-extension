const PressurePlaceholder = ({ children }: { children: JSX.Element }) => {
    return (
        <div id="p-placeholder">
            <span id="pressure-text">Pressure</span>
            {children}
        </div>
    );
}

export default PressurePlaceholder;