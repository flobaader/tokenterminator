class EnergyCalculator:
    def __init__(self, watt_per_token: float = 0.0002):  # Example: 0.0002 Wh per Token
        self.watt_per_token = watt_per_token

    def calculate_energy_saving(self, saved_tokens: int) -> float:
        # Calculate saved energy in watt-hours based on saved tokens 
        energy_saving = saved_tokens * self.watt_per_token
        return energy_saving
