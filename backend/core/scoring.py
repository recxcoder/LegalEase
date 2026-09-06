def calculate_power_score(clauses: list) -> int:
    """
    Calculate power balance score 0-100
    100 = heavily favors other party
    0   = heavily favors you
    """
    if not clauses:
        return 0

    weights = {
        "Red flag": 20,
        "Warning": 8,
        "Safe": -3
    }

    score = 50  # Start neutral
    for clause in clauses:
        score += weights.get(clause.get("severity", "Warning"), 0)

    return max(0, min(100, score))  # Clamp between 0-100