from flask import Flask, request
import json

app = Flask(__name__)


@app.route('/api/metrics', methods=['POST'])
def receive():
    try:
        # Get metrics data
        metrics = request.json

        # Pretty print metrics
        formatted_metrics = json.dumps(metrics, indent=4)
        print("Received metrics:")
        print(formatted_metrics)

        return '', 200
    except Exception as e:
        print("Error processing metrics:", e)
        return '', 500


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=4000)
