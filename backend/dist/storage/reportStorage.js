"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processReportDB = exports.getFreeBoardReportsDB = exports.getDripReportsDB = exports.getAllReportsDB = exports.checkFreeBoardReportExists = exports.createFreeBoardReportStorage = exports.hasUserReportedDB = exports.getReportCountDB = exports.createReportDB = void 0;
const db_1 = require("../db");
const createReportDB = async (data) => {
    const client = await db_1.pool.connect();
    try {
        await client.query("BEGIN");
        // 이미 신고한 적이 있는지 확인
        const existingReport = await client.query(`SELECT report_id FROM drip_post_report 
       WHERE target_type = $1::report_target_type 
       AND target_id = $2 
       AND reporter_id = $3`, [data.targetType, data.targetId, data.reporterId]);
        if (existingReport.rows.length > 0) {
            throw new Error("이미 신고한 게시물입니다.");
        }
        // 신고 데이터 삽입
        const result = await client.query(`INSERT INTO drip_post_report (target_type, target_id, reporter_id, report_reason) 
       VALUES ($1::report_target_type, $2, $3, $4::report_reason_type) 
       RETURNING report_id`, [data.targetType, data.targetId, data.reporterId, data.reportReason]);
        await client.query("COMMIT");
        return {
            success: true,
            message: "신고가 성공적으로 접수되었습니다.",
            reportId: result.rows[0].report_id
        };
    }
    catch (error) {
        await client.query("ROLLBACK");
        console.error("createReportDB error:", error);
        throw error;
    }
    finally {
        client.release();
    }
};
exports.createReportDB = createReportDB;
const getReportCountDB = async (targetType, targetId) => {
    try {
        const result = await db_1.pool.query(`SELECT COUNT(*) as count FROM drip_post_report 
       WHERE target_type = $1::report_target_type AND target_id = $2`, [targetType, targetId]);
        return parseInt(result.rows[0].count);
    }
    catch (error) {
        console.error("getReportCountDB error:", error);
        throw error;
    }
};
exports.getReportCountDB = getReportCountDB;
const hasUserReportedDB = async (targetType, targetId, reporterId) => {
    try {
        const result = await db_1.pool.query(`SELECT report_id FROM drip_post_report 
       WHERE target_type = $1::report_target_type 
       AND target_id = $2 
       AND reporter_id = $3`, [targetType, targetId, reporterId]);
        return result.rows.length > 0;
    }
    catch (error) {
        console.error("hasUserReportedDB error:", error);
        throw error;
    }
};
exports.hasUserReportedDB = hasUserReportedDB;
// 자유게시판 신고 관련 함수들
const createFreeBoardReportStorage = async (targetType, targetId, reporterId, reportReason) => {
    const query = `
    INSERT INTO freeboard_report (target_type, target_id, reporter_id, report_reason)
    VALUES ($1, $2, $3, $4)
  `;
    await db_1.pool.query(query, [targetType, targetId, reporterId, reportReason]);
};
exports.createFreeBoardReportStorage = createFreeBoardReportStorage;
const checkFreeBoardReportExists = async (targetType, targetId, reporterId) => {
    const query = `
    SELECT COUNT(*) as count
    FROM freeboard_report
    WHERE target_type = $1 AND target_id = $2 AND reporter_id = $3
  `;
    const result = await db_1.pool.query(query, [targetType, targetId, reporterId]);
    return parseInt(result.rows[0].count) > 0;
};
exports.checkFreeBoardReportExists = checkFreeBoardReportExists;
// 관리자용 신고 목록 조회 함수들
const getAllReportsDB = async () => {
    try {
        const [dripReports, freeBoardReports] = await Promise.all([
            (0, exports.getDripReportsDB)(),
            (0, exports.getFreeBoardReportsDB)()
        ]);
        return [...dripReports, ...freeBoardReports];
    }
    catch (error) {
        console.error("getAllReportsDB error:", error);
        throw error;
    }
};
exports.getAllReportsDB = getAllReportsDB;
const getDripReportsDB = async () => {
    try {
        const query = `
      SELECT 
        r.report_id,
        r.target_type,
        r.target_id,
        r.reporter_id,
        r.report_reason,
        r.created_at,
        u.user_id as reporter_nickname,
        CASE 
          WHEN r.target_type = 'post' THEN dp.post_image
          WHEN r.target_type = 'comment' THEN dpc.content
        END as target_content,
        CASE 
          WHEN r.target_type = 'post' THEN dpu.user_id
          WHEN r.target_type = 'comment' THEN dpcu.user_id
        END as target_author,
        CASE 
          WHEN r.target_type = 'post' THEN dp.post_no
          WHEN r.target_type = 'comment' THEN dpc.post_id
        END as post_id
      FROM drip_post_report r
      LEFT JOIN users u ON r.reporter_id = u.user_id
      LEFT JOIN drip_post dp ON r.target_type = 'post' AND r.target_id = dp.post_no
      LEFT JOIN users dpu ON dp.user_id = dpu.user_id
      LEFT JOIN drip_post_comment dpc ON r.target_type = 'comment' AND r.target_id = dpc.id
      LEFT JOIN users dpcu ON dpc.user_id = dpcu.user_id
      ORDER BY r.created_at DESC
    `;
        const result = await db_1.pool.query(query);
        return result.rows;
    }
    catch (error) {
        console.error("getDripReportsDB error:", error);
        throw error;
    }
};
exports.getDripReportsDB = getDripReportsDB;
const getFreeBoardReportsDB = async () => {
    try {
        const query = `
      SELECT 
        r.report_id,
        r.target_type,
        r.target_id,
        r.reporter_id,
        r.report_reason,
        r.created_at,
        u.user_id as reporter_nickname,
        CASE 
          WHEN r.target_type = 'post' THEN fb.title || ' - ' || fb.content
          WHEN r.target_type = 'comment' THEN fbc.content
        END as target_content,
        CASE 
          WHEN r.target_type = 'post' THEN fbu.user_id
          WHEN r.target_type = 'comment' THEN fbcu.user_id
        END as target_author,
        CASE 
          WHEN r.target_type = 'post' THEN fb.id
          WHEN r.target_type = 'comment' THEN fbc.post_id
        END as post_id
      FROM freeboard_report r
      LEFT JOIN users u ON r.reporter_id = u.user_id
      LEFT JOIN freeboard fb ON r.target_type = 'post' AND r.target_id = fb.id
      LEFT JOIN users fbu ON fb.user_id = fbu.user_id
      LEFT JOIN freeboard_comments fbc ON r.target_type = 'comment' AND r.target_id = fbc.id
      LEFT JOIN users fbcu ON fbc.user_id = fbcu.user_id
      ORDER BY r.created_at DESC
    `;
        const result = await db_1.pool.query(query);
        return result.rows;
    }
    catch (error) {
        console.error("getFreeBoardReportsDB error:", error);
        throw error;
    }
};
exports.getFreeBoardReportsDB = getFreeBoardReportsDB;
// 신고 처리 (삭제 또는 무시)
const processReportDB = async (reportId, action, boardType) => {
    const client = await db_1.pool.connect();
    try {
        await client.query("BEGIN");
        // 신고 정보 조회
        const tableName = boardType === 'drip' ? 'drip_post_report' : 'freeboard_report';
        const reportQuery = `SELECT * FROM ${tableName} WHERE report_id = $1`;
        const reportResult = await client.query(reportQuery, [reportId]);
        if (reportResult.rows.length === 0) {
            throw new Error('신고를 찾을 수 없습니다.');
        }
        const report = reportResult.rows[0];
        if (action === 'delete') {
            // 신고된 게시글/댓글 삭제
            if (boardType === 'drip') {
                if (report.target_type === 'post') {
                    await client.query('DELETE FROM drip_post WHERE post_no = $1', [report.target_id]);
                }
                else {
                    await client.query('DELETE FROM drip_post_comment WHERE id = $1', [report.target_id]);
                }
            }
            else {
                if (report.target_type === 'post') {
                    await client.query('DELETE FROM freeboard WHERE id = $1', [report.target_id]);
                }
                else {
                    await client.query('DELETE FROM freeboard_comments WHERE id = $1', [report.target_id]);
                }
            }
        }
        // 신고 삭제
        await client.query(`DELETE FROM ${tableName} WHERE report_id = $1`, [reportId]);
        await client.query("COMMIT");
        return {
            success: true,
            message: action === 'delete' ? '신고된 내용이 삭제되었습니다.' : '신고가 무시되었습니다.'
        };
    }
    catch (error) {
        await client.query("ROLLBACK");
        console.error("processReportDB error:", error);
        throw error;
    }
    finally {
        client.release();
    }
};
exports.processReportDB = processReportDB;
