<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reçu de Réservation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 40px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .info {
            margin-bottom: 20px;
        }
        .details {
            margin-top: 30px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Reçu de Réservation</h1>
        <p>Date d'émission: {{ $date_emission }}</p>
    </div>

    <div class="info">
        <h2>Informations Client</h2>
        <p>Nom: {{ $reservation->user->name }}</p>
        <p>Email: {{ $reservation->user->email }}</p>
    </div>

    <div class="details">
        <h2>Détails de la Réservation</h2>
        <table>
            <tr>
                <th>Voiture</th>
                <td>{{ $reservation->voiture->marque }} {{ $reservation->voiture->modele }}</td>
            </tr>
            <tr>
                <th>Période</th>
                <td>Du {{ \Carbon\Carbon::parse($reservation->date_debut)->format('d/m/Y') }} au {{ \Carbon\Carbon::parse($reservation->date_fin)->format('d/m/Y') }}</td>
            </tr>
            <tr>
                <th>Lieu de prise</th>
                <td>{{ $reservation->lieu_prise }}</td>
            </tr>
            <tr>
                <th>Lieu de retour</th>
                <td>{{ $reservation->lieu_retour }}</td>
            </tr>
            <tr>
                <th>Prix journalier</th>
                <td>{{ $reservation->voiture->prix_journalier }} DH</td>
            </tr>
            <tr>
                <th>Durée</th>
                <td>{{ \Carbon\Carbon::parse($reservation->date_debut)->diffInDays(\Carbon\Carbon::parse($reservation->date_fin)) }} jours</td>
            </tr>
            <tr>
                <th>Prix total</th>
                <td>{{ $reservation->voiture->prix_journalier * \Carbon\Carbon::parse($reservation->date_debut)->diffInDays(\Carbon\Carbon::parse($reservation->date_fin)) }} DH</td>
            </tr>
        </table>
    </div>

    <div class="footer">
        <p>Merci de votre confiance</p>
        <p>CarRental - Tous droits réservés</p>
    </div>
</body>
</html>
