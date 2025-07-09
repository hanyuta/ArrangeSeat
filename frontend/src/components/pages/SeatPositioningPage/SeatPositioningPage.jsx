import React, { useEffect, useState } from 'react';

const SeatPositioningPage = () => {
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        fetch('/api/boxes')
            .then(res => res.json())
            .then(data => setBoxes(data))
            .catch(err => {
                alert('データ取得に失敗しました');
                console.error(err);
            });
    }, []);

    return (
        <div>
            <h1>Seat Positioning Page</h1>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>X位置</th>
                        <th>Y位置</th>
                        <th>回転角</th>
                        <th>作成日時</th>
                        <th>更新日時</th>
                    </tr>
                </thead>
                <tbody>
                    {boxes.map(box => (
                        <tr key={box.id}>
                            <td>{box.id}</td>
                            <td>{box.x_position}</td>
                            <td>{box.y_position}</td>
                            <td>{box.rotation_angle}</td>
                            <td>{box.createdAt}</td>
                            <td>{box.updatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SeatPositioningPage;