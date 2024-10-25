class EnergyCalculator:
    def __init__(self, watt_per_token: float = 0.0002, cost_per_token: float = 0.000002):
        """
        Initialize the EnergyCalculator with a watt per token and cost per token.
        
        Parameters:
        - watt_per_token: Estimated watt-hours used per token (default: 0.0002 Wh).
        - cost_per_token: Estimated cost per token in dollars (default: $0.000002).
        """
        self.watt_per_token = watt_per_token
        self.cost_per_token = cost_per_token

    def calculate_energy_saving(self, saved_tokens: int) -> float:
        #Calculate saved energy in watt-hours based on saved tokens.
        energy_saving = saved_tokens * self.watt_per_token
        return energy_saving

    def calculate_cost_saving(self, saved_tokens: int) -> float:
        #Calculate cost savings in dollars based on saved tokens.
        cost_saving = saved_tokens * self.cost_per_token
        return cost_saving
