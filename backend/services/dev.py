from collections import Counter

def developer_stats(commits):
    dev_count = Counter()
    timeline = {}

    for c in commits:
        author = c["author"]
        date = c["date"][:10]

        dev_count[author] += 1
        timeline[date] = timeline.get(date, 0) + 1

    total = sum(dev_count.values())

    # 🔥 sort + top 5 + percentage
    top = dev_count.most_common(5)

    contributors = [
        {
            "name": dev,
            "count": count,
            "percent": round((count / total) * 100, 1)
        }
        for dev, count in top
    ]

    return {
        "contributors": contributors,
        "timeline": timeline
    }