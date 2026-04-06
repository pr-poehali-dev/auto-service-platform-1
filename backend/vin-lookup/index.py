"""
VIN-поиск автомобиля через открытое API NHTSA (vpic.nhtsa.dot.gov).
Возвращает марку, модель, год, тип кузова и другие характеристики.
"""
import json
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    params = event.get('queryStringParameters') or {}
    vin = (params.get('vin') or '').strip().upper()

    if not vin:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Введите VIN-код'}),
        }

    if len(vin) != 17:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'VIN должен содержать 17 символов, получено: {len(vin)}'}),
        }

    url = f'https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/{urllib.parse.quote(vin)}?format=json'

    req = urllib.request.Request(url, headers={'User-Agent': 'AutoParts/1.0'})
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode('utf-8'))

    results = data.get('Results', [])

    def get_val(variable_id: int) -> str:
        for r in results:
            if r.get('VariableId') == variable_id:
                v = r.get('Value') or ''
                return v.strip() if v and v.lower() not in ('not applicable', 'null', '') else ''
        return ''

    make = get_val(26)        # Make
    model = get_val(28)       # Model
    year = get_val(29)        # Model Year
    body_class = get_val(5)   # Body Class
    engine = get_val(9)       # Engine Number of Cylinders
    displacement = get_val(13)  # Displacement (L)
    fuel = get_val(24)        # Fuel Type - Primary
    plant_country = get_val(75)  # Plant Country
    series = get_val(34)      # Series
    trim = get_val(38)        # Trim
    drive = get_val(15)       # Drive Type
    transmission = get_val(37)  # Transmission Style

    if not make and not model:
        return {
            'statusCode': 404,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Автомобиль не найден. Проверьте VIN-код.'}),
        }

    car = {
        'vin': vin,
        'make': make,
        'model': model,
        'year': year,
        'body_class': body_class,
        'series': series,
        'trim': trim,
        'engine_cylinders': engine,
        'displacement': displacement,
        'fuel_type': fuel,
        'drive_type': drive,
        'transmission': transmission,
        'plant_country': plant_country,
    }

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True, 'car': car}),
    }
